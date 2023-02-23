<template>
  <a-alert :message="message" :description="descriptionJoin" :type="type" showIcon />
</template>

<script>
export default {
  name: 'Alert',
  props: ['message', 'description', 'type'],
  computed: {
    descriptionJoin () {
      return this.description.join(', ')
    }
  }
}
</script>
