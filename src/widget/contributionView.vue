<template>
    <div class="wrapper">
        <scroller scroll-direction="horizontal"
                  show-scrollbar="false"
                  scrollToBegin="true"
                  class="scroller">
            <div class="box-group" v-for="(itemGroup,index) in renderItems">
                <div class="box"
                     v-for="(box,index2) in itemGroup"
                     :style="{'background-color':(colors[box.color])}"/>
            </div>
        </scroller>
    </div>
</template>

<script>

    import utils from "@/libs/utils";
    import {WxcPopover} from 'weex-ui'

    let colors = {
        less: "#eaeaea",
        little: "#D6E685",
        some: "#8CC665",
        many: "#44A340",
        much: "#1E6823"
    }

    function buildItems(array) {
        if (array == null) {
            return []
        }
        let items = new Array(parseInt((array.length / 7).toString()))
        let temp = []
        for (let i = 0; i < array.length; i++) {
            let item = array[i]
            temp.push(item)
            if (temp.length === 7 || array.length - 1 === i) {
                items.push(temp)
                temp = []
            }
        }
        return items
    }

    export default {
        name: "contributionView",
        props: {
            items: {
                type: Array,
                default: () => ([])
            }
        },
        components: {
            WxcPopover
        },
        computed: {
            renderItems: function () {
                return buildItems(this.items)
            },
        },
        methods: {
        },
        data() {
            return {
                colors: colors,
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        background-color: white;
        width: 750px;
        justify-content: center;
        align-items: center;
        height: 250px;
    }

    .scroller {
        flex-direction: row;
        width: 710px;
        height: 210px;
    }

    .box-group {
        flex-direction: column;
    }

    .box {
        background-color: #eaeaea;
        height: 25px;
        width: 25px;
        border-radius: 2.5px;
        margin: 2.5px;
    }
</style>