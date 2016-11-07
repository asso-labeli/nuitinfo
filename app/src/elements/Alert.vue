<template>
    <div>
        <div v-if="hasAlert">ALERTS</div>
    </div>
</template>

<script>
    import alerts from '../stores/AlertStore';
    export default {
        data() {
            return {};
        },
        computed: {
            hasAlert(){
                return alerts.state.alerts.length > 0;
            }
        }
    }
</script>