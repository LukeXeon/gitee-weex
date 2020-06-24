<template>
    <div class="search-box">
        <div class="wxc-search-bar"
             :style="barStyle">
            <input @blur="onBlur"
                   @focus="onFocus"
                   @input="onInput"
                   @return="onSubmit"
                   :return-key-type="returnKeyType"
                   :autofocus="autofocus"
                   :disabled="disabled"
                   :value="value"
                   ref="search-input"
                   :type="inputType"
                   :placeholder="placeholder"
                   class="search-bar-input" />
            <div v-if="disabled"
                 @click="inputDisabledClicked"
                 class="disabled-input">
            </div>
            <image class="search-bar-icon"
                   :aria-hidden="true"
                   :src="require('@/res/search(2).png').default">
            </image>
            <image class="search-bar-close"
                   v-if="showClose"
                   :aria-hidden="true"
                   @click="closeClicked"
                   :src="require('@/res/close.png').default">
            </image>
        </div>
    </div>
</template>

<style scoped>
    .wxc-search-bar {
        padding-left: 20px;
        padding-right: 20px;
        background-color: #ffffff;
        width: 750px;
        height: 84px;
        flex-direction: row;
    }
    .search-bar-input {
        position: absolute;
        top: 10px;
        padding-top: 0;
        padding-bottom: 0;
        padding-right: 40px;
        padding-left: 60px;
        font-size: 26px;
        width: 710px;
        height: 64px;
        line-height: 64px;
        background-color: #E5E5E5;
        border-radius: 6px;
    }

    .search-bar-icon {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 34px;
        top: 28px;
    }

    .search-bar-close {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 34px;
        top: 28px;
    }

    .disabled-input {
        width: 750px;
        height: 64px;
        position: absolute;
        left: 0;
        background-color: transparent;
    }

    .search-box {
        margin: 5px;
    }

</style>

<script>

    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            alwaysShowCancel: {
                type: Boolean,
                default: false
            },
            inputType: {
                type: String,
                default: 'text'
            },
            returnKeyType: {
                type: String,
                default: 'default'
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: 'gray'
            },
            barStyle: {
                type: Object,
                default: () => ({})
            },
            defaultValue: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '搜索'
            },
        },
        data: () => ({
            showClose: false,
            value: ''

        }),
        created() {
            this.defaultValue && (this.value = this.defaultValue);
            if (this.disabled) {
                this.showClose = false;
            }
        },
        methods: {
            onBlur() {
                const self = this;
                setTimeout(() => {
                    self.detectShowClose();
                    self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
                }, 10);
            },
            autoBlur() {
                this.$refs['search-input'].blur();
            },
            onFocus() {
                if (this.isDisabled) {
                    return;
                }
                this.detectShowClose();
                this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
            },
            closeClicked() {
                this.value = '';
                this.showClose && (this.showClose = false);
                this.$emit('wxcSearchbarCloseClicked', { value: this.value });
                this.$emit('wxcSearchbarInputOnInput', { value: this.value });
            },
            onInput(e) {
                this.value = e.value;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputOnInput', { value: this.value });
            },
            onSubmit(e) {
                this.onBlur();
                this.value = e.value;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputReturned', { value: this.value });
            },
            detectShowClose() {
                this.showClose = (this.value.length > 0)
            },
            inputDisabledClicked() {
                this.$emit('wxcSearchbarInputDisabledClicked', {});
            },
            setValue(value) {
                this.value = value;
            }
        }
    };
</script>
