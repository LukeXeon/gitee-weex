<template>
    <div class="wrapper">
        <scroller scroll-direction="horizontal"
                  scrollable="true"
                  ref="scroller"
                  alwaysScrollableHorizontal="true"
                  show-scrollbar="false"
                  scrollToBegin="true"
                  class="scroller">
            <div class="box-group"
                 :ref="'group'+index"
                 v-for="(itemGroup,index) in renderItems">
                <div class="box"
                     v-for="(box,index2) in itemGroup"
                     :style="{'background-color':(colors[box.color])}"/>
            </div>
        </scroller>
    </div>
</template>

<script>

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
        let items = new Array(Math.floor(array.length / 7))
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
        computed: {
            renderItems() {
                return buildItems(this.items)
            },
        },
        watch:{
            renderItems(value) {
                if (value && value.length > 0) {
                    setTimeout(() => {
                        try {
                            let vnode = this.$refs['group' + (value.length - 1)][0]
                            if (vnode) {
                                let dom = weex.requireModule('dom')
                                dom.scrollToElement(vnode, {
                                    offset: 0,
                                    animated: true
                                })
                            }
                        } catch (e) {
                        }
                    }, 500)
                }
            }
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
        height: 220px;
        border-bottom-color: #dddddd;
        border-top-color: #dddddd;
        border-top-width: 0.5px;
        border-bottom-width: 0.5px;
    }

    .scroller {
        flex-direction: row;
        width: 710px;
        height: 190px;
    }

    .box-group {
        flex-direction: column;
    }

    .box {
        background-color: #eaeaea;
        height: 23px;
        width: 23px;
        border-radius: 2px;
        margin: 2px;
    }
</style>