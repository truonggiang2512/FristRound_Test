"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
  count: number
  checked?: boolean
}

interface FilterGroup {
  id: string
  title: string
  options: FilterOption[]
  expanded?: boolean
}

interface PriceRange {
  id: string
  label: string
  min?: number
  max?: number
}

interface FilterSidebarProps {
  filterGroups: FilterGroup[]
  priceRanges: PriceRange[]
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void
  onPriceRangeChange?: (rangeId: string) => void
}

export function FilterSidebar({ filterGroups, priceRanges, onFilterChange, onPriceRangeChange }: FilterSidebarProps) {
  const [groups, setGroups] = useState<FilterGroup[]>(filterGroups.map((group) => ({ ...group, expanded: true })))
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)

  const toggleGroup = (groupId: string) => {
    setGroups(groups.map((group) => (group.id === groupId ? { ...group, expanded: !group.expanded } : group)))
  }

  const handleCheckboxChange = (groupId: string, optionId: string, checked: boolean) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            options: group.options.map((option) => (option.id === optionId ? { ...option, checked } : option)),
          }
        }
        return group
      }),
    )

    if (onFilterChange) {
      onFilterChange(groupId, optionId, checked)
    }
  }

  const handlePriceRangeClick = (rangeId: string) => {
    setSelectedPriceRange(rangeId)
    if (onPriceRangeChange) {
      onPriceRangeChange(rangeId)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 font-medium text-blue-600">
          <Filter className="h-5 w-5" />
          <span>Bộ Lọc</span>
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleGroup(group.id)}
            className="flex items-center justify-between w-full p-4 text-left font-medium"
          >
            <span>{group.title}</span>
            {group.expanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {group.expanded && (
            <div className="px-4 pb-4 space-y-2">
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${group.id}-${option.id}`}
                    checked={option.checked || false}
                    onCheckedChange={(checked) => handleCheckboxChange(group.id, option.id, checked as boolean)}
                  />
                  <label
                    htmlFor={`${group.id}-${option.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between w-full"
                  >
                    <span>{option.label}</span>
                    <span className="text-gray-500">({option.count})</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleGroup("price")}
          className="flex items-center justify-between w-full p-4 text-left font-medium"
        >
          <span>Khoảng giá</span>
          <ChevronUp className="h-4 w-4 text-gray-500" />
        </button>

        <div className="px-4 pb-4 space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handlePriceRangeClick(range.id)}
              className={cn(
                "w-full py-2 text-sm text-left border rounded-md",
                selectedPriceRange === range.id
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-200 hover:bg-gray-50",
              )}
            >
              <span className="px-3">{range.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
