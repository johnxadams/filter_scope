<template>
  <li>
    <article
      class="flex bg-gray-100 bg-white/10 backdrop-blur-lg items-center min-h-48 gap-x-6 border-gray-600 p-6"
    >
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
        class="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10"
      />
      <div>
        <h3 class="text-base/7 font-semibold tracking-tight text-black">{{ product.name }}</h3>

        <!-- <p class="text-sm/6 font-semibold text-indigo-400">Co-Founder / CEO</p> -->
      </div>
    </article>
  </li>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
