import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Tag } from "lucide-react"
import { useState } from "react"

export function CategoryDropdown({ categories, selectedId, onSelect, placeholder = "Select a category" }) {
  const [open, setOpen] = useState(false)
  const selectedLabel = categories.find(c => c.key === selectedId)?.label || "All Categories"

  const handleSelect = (id) => {
    onSelect(id)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center gap-2 truncate">
            <Tag className="h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate">{selectedId === 'all' ? 'All Categories' : selectedLabel}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] max-w-[800px] p-4" align="start">
        <div className="mb-4 border-b pb-2">
          <h4 className="font-medium leading-none text-slate-900">Categories</h4>
          <p className="mt-1 text-xs text-slate-500">
            Select a category to filter products
          </p>
        </div>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Button
            variant={selectedId === 'all' ? "secondary" : "ghost"}
            className="justify-start font-normal"
            onClick={() => handleSelect('all')}
          >
            All Categories
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selectedId === cat.key ? "secondary" : "ghost"}
              className="justify-start truncate font-normal"
              onClick={() => handleSelect(cat.key)}
              title={cat.label}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
