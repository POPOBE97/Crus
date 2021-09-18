<template>
  <span :class="classObject">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    /**
    * title
    * subtitle
    * heading
    * heading2
    * heading3
    * paragraph
    * caption
    * footnote
    * @return string
    */
    props: [ 'hierachy' ],
    data () {
      return {}
    },
    computed: {
      classObject: function () {
        return {
          title: this.hierachy === 'title',
          subtitle: this.hierachy === 'subtitle',
          heading: this.hierachy === 'heading',
          heading2: this.hierachy === 'heading2',
          heading3: this.hierachy === 'heading3',
          paragraph: this.hierachy === 'paragraph',
          caption: this.hierachy === 'caption',
          footnote: this.hierachy === 'footnote'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  span {
      &.title {
        font-size: 20px;
        font-weight: 400;
        line-height: 20px;
      }
      &.subtitle {
        font-size: 18px;
        font-weight: 400;
        line-height: 18px;
        opacity: 0.6;
      }
      &.heading {
        font-size: 18px;
        font-weight: 300;
        line-height: 18px;
      }
      &.heading2 {
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
      }
      &.heading3 {
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
      }
      &.paragraph {
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
      }
      &.caption {
        font-size: 12px;
        font-weight: 600;
        line-height: 12px;
        opacity: 0.6;
      }
      &.footnote {
        font-size: 12px;
        font-weight: 300;
        line-height: 12px;
        opacity: 0.6;
      }
  }
</style>
