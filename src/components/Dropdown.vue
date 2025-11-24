<template>
  <div ref="dropdown" class="relative inline-block text-left w-full md:w-auto">
    <button
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact.prevent="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
      type="button"
      class="inline-flex w-full justify-between items-center gap-x-1.5 bg-white/10 px-4 py-2 text-sm md:text-base font-normal text-white inset-ring-1 inset-ring-white/5 hover:bg-black/10 cursor-pointer transition-colors"
      aria-haspopup="listbox"
      :aria-expanded="open.toString()"
      :aria-controls="'dropdown-menu'"
      :aria-label="accessLabel"
    >
      {{ placeholder || displayLabel }}
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        class="-mr-1 size-5 text-white-400 transition-transform"
        :class="{ 'rotate-180': open }"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        />
      </svg>
    </button>

    <transition name="dropdown-fade">
      <ul
        v-if="open"
        id="dropdown-menu"
        ref="dropdownList"
        role="listbox"
        tabindex="-1"
        class="absolute left-0 mt-2 w-56 origin-top-right bg-gray-800 shadow-lg outline outline-1 outline-white/10 py-1 z-20"
      >
        <li
          v-if="defaultOption"
          ref="firstItem"
          class="px-4 py-2 text-sm text-gray-200 cursor-pointer hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none"
          role="option"
          tabindex="0"
          @click="emitSelectedOption('')"
          @keydown.enter.prevent="emitSelectedOption('')"
          @keydown.space.prevent="emitSelectedOption('')"
          @keydown.esc.exact.prevent="hideDropdown"
          @keydown.down.prevent="focusNextItem"
          @keydown.up.prevent="focusPreviousItem"
        >
          {{ defaultOption }}
        </li>

        <li
          v-for="(option, index) in dropdownOptions"
          role="option"
          tabindex="0"
          :key="option"
          class="px-4 py-2 text-sm text-gray-200 cursor-pointer hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none"
          @click="emitSelectedOption(option)"
          @keydown.enter.prevent="emitSelectedOption(option)"
          @keydown.space.prevent="emitSelectedOption(option)"
          @keydown.esc.exact.prevent="hideDropdown"
          @keydown.down.prevent="focusNextItem"
          @keydown.up.prevent="focusPreviousItem"
          @keydown.tab.exact="index === dropdownOptions.length - 1 ? hideDropdown() : null"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  dropdownOptions: {
    type: Array,
    required: true,
  },
  defaultOption: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  accessLabel: {
    type: String,
    default: 'Dropdown Menu',
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const dropdown = ref(null)
const firstItem = ref(null)
const dropdownList = ref(null)

// shows me selected value or placeholder - DEfault Option
const displayLabel = computed(() => {
  if (props.modelValue === '' || !props.modelValue) {
    return props.defaultOption || props.placeholder
  }
  return props.modelValue
})

// Toggle dropdown visibility
const toggleVisibility = () => {
  open.value = !open.value
  if (open.value) {
    // nextTick to ensure DOM is ready before focusing on firstItem
    nextTick(() => {
      firstItem.value?.focus()
    })
  }
}

// Hide dropdown especially on Escape and Shift+Tab on the last item
const hideDropdown = () => {
  open.value = false
}

// Start arrow key navigation
const startArrowKeys = () => {
  if (!open.value) {
    open.value = true
    nextTick(() => {
      firstItem.value?.focus()
    })
  } else {
    firstItem.value?.focus()
  }
}

// focus next and previous items
const focusNextItem = (event) => {
  const nextElement = event.target.nextElementSibling
  if (nextElement && nextElement.tagName === 'LI') {
    nextElement.focus()
  }
}

const focusPreviousItem = (event) => {
  const prevElement = event.target.previousElementSibling
  if (prevElement && prevElement.tagName === 'LI') {
    prevElement.focus()
  }
}
// Click outside to close dropdown
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    open.value = false
  }
}
// Emit selected category and close dropdown
const emitSelectedOption = (value) => {
  emit('update:modelValue', value)
  open.value = false
}
// get selected label
// const selectedLabel = computed(() =>
//   props.modelValue === '' ? 'All Categories' : props.modelValue,
// )
// Escape key to handel close dropdown
function handleKey(e) {
  if (!open.value) return

  if (e.key === 'Escape') {
    open.value = false
  }
}

// Auto-focus first item when dropdown opens
watch(open, (newVal) => {
  if (newVal) {
    nextTick(() => {
      firstItem.value?.focus()
    })
  }
})
// Add and remove event listeners of keydown and clickOutside
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKey)
})
</script>

<style lang="scss" scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
