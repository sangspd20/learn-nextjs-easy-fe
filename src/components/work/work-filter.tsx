import { AutocompleteField, InputField } from '@/components/form'
import { useTagList } from '@/hooks'
import { WorkFiltersPayload } from '@/models'
import { Search } from '@mui/icons-material'
import { InputAdornment, debounce } from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

export interface WorkFiltersProps {
  initialValues?: WorkFiltersPayload

  onSubmit?: (payload: WorkFiltersPayload) => void
}

export function WorkFilters({ onSubmit, initialValues }: WorkFiltersProps) {
  const { data } = useTagList({})
  const tagList = data?.data || []
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      ...initialValues,
      selectedTagList: [],
    },
  })

  async function handleLoginSubmit(payload: WorkFiltersPayload) {
    if (!payload) return

    payload.tagList_like = payload.selectedTagList?.join('|') || ''
    delete payload.selectedTagList
    await onSubmit?.(payload)
  }

  const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350)

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField
        name="search"
        placeholder="search work by title"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          console.log('change', event.target.value)
          debounceSearchChange()
        }}
      />

      <AutocompleteField
        name="selectedTagList"
        label="Filter by category"
        placeholder="Categories"
        control={control}
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={() => debounceSearchChange()}
      />
    </Box>
  )
}
