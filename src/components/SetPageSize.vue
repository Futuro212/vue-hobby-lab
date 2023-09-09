<template>
    <div class="columns is-vcentered">
        <div class="column is-8">
        </div>
        <div class="page-size-column column is-2">
            <p>Page Size:</p>
        </div>
        <div class="page-size-column column is-2">
            <div class="dropdown" :class="{'is-active': dropdownIsActive}" @click="toggleDropdown">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{{ pageSize }}</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a @click="setPageSizeValue(5)" class="dropdown-item">
                            5
                        </a>
                        <a @click="setPageSizeValue(10)" class="dropdown-item">
                            10
                        </a>
                        <a @click="setPageSizeValue(25)" class="dropdown-item">
                            25
                        </a>
                        <a @click="setPageSizeValue(50)" class="dropdown-item">
                            50
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSetStore } from '@/stores/set';

const dropdownIsActive = ref(false);
const pageSize = ref(5);

const { setPageSize, fetchSets } = useSetStore();

const toggleDropdown = () => dropdownIsActive.value = !dropdownIsActive.value;
const setPageSizeValue = (value: number) => {
    pageSize.value = value;
    setPageSize(value);

    //To refresh the set table after page size changes
    fetchSets();
}
</script>

<style scoped lang="scss">
.page-size-column {
    display: flex;
    justify-content: flex-end;
}
</style>