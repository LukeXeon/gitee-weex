<template>
    <div class="search-box">
        <div class="search-bar"
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
            <image class="search-bar-icon"
                   :aria-hidden="true"
                   :src="require('@/res/search(2).png').default">
            </image>
            <image class="search-bar-close"
                   v-if="showClose"
                   @click="closeClicked"
                   :src="require('@/res/close.png').default">
            </image>
        </div>
    </div>
</template>

<style scoped>
    .search-bar {
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
        padding: 0 40px 0 60px;
        font-size: 26px;
        width: 710px;
        height: 64px;
        line-height: 64px;
        background-color: #E5E5E5;
        border-radius: 15px;
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

    .search-box {
        margin: 5px;
    }

</style>

<script>

    export default {
        props: {
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
            value: '',
            showClose: false
        }),
        created() {
            this.defaultValue && (this.value = this.defaultValue);
        },
        methods: {
            onBlur() {
                const self = this;
                setTimeout(() => {
                    self.detectShowClose()
                    self.$emit('onBlur', { value: self.value });
                }, 10);
            },
            detectShowClose() {
                this.showClose = (this.value.length > 0);
            },
            onFocus() {
                this.detectShowClose()
                this.$emit('onFocus', { value: this.value });
            },
            closeClicked() {
                this.value = '';
                this.detectShowClose()
                this.$emit('onClose', { value: this.value });
            },
            onInput(e) {
                this.value = e.value;
                this.detectShowClose()
                this.$emit('onInput', { value: this.value });
            },
            onSubmit(e) {
                this.onBlur();
                this.value = e.value;
                this.detectShowClose()
                this.$emit('onReturn', { value: this.value });
            },
            setValue(value) {
                this.value = value;
                this.detectShowClose();
            }
        }
    };
</script>
