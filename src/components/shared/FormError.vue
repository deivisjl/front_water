<template>
    <p v-show="errors_form.has(attribute_name)" class="validado font-weight-medium red--text">{{ errors_form.first(attribute_name) }}</p>
</template>

<script>
    export default {
        props: ['attribute_name', 'errors_form']
    }
</script>