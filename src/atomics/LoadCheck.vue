<template>
  <svg :class="{blue: loading}" class="lstatus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="lstatus__circle" cx="26" cy="26" r="25" fill="none"/><circle v-if="loading" class="lstatus__progress" cx="26" cy="26" r="15" fill="none"/><path v-else class="lstatus__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
</template>

<script>
export default {
  props: ['loading']
}
</script>

<style lang="scss">
// Colors
$green: #7ac142;
$blue: #4260c1;
$white: #fff;

// Misc
$curve: cubic-bezier(0.650, 0.000, 0.450, 1.000);

.lstatus {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: $white;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px $green;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;

  .lstatus__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: $green;
    fill: none;
    animation: stroke .6s $curve forwards;
  }

  &.blue {
    box-shadow: inset 0px 0px 0px $blue;
    animation: fill-blue .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;

    .lstatus__circle {
      stroke: $blue;
    }
  }
}

.lstatus__progress {
  stroke-dasharray: 10;
  stroke-dashoffset: 100;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: $white;
  fill: none;
  animation: stroke 1s $curve infinite;
}

.lstatus__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke .3s $curve .8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px $green;
  }
}
@keyframes fill-blue {
  100% {
    box-shadow: inset 0px 0px 0px 30px $blue;
  }
}
</style>