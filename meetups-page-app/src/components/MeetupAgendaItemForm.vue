<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove($event)">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <!--      На select v-model-->
      <!--      v-model это :prop="value" @event="value = $event"-->
      <!--      когда есть только change, то только обрабатывается выбор значения в селекте, и обновляются данные при выборе значения.-->
      <!--      Но при этом текущий выбранный элемент в селекте никак не связан с данными-->
      <select class="form-control" title="Тип" v-model="agendaItem_.type" >
        <option
          v-for="type in agendaItemTypes"
          :key="type.value"
          :value="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.endsAt"/>
        </div>
      </div>
    </div>

    <template v-if="agendaItem_.type === 'talk'">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <input class="form-control" v-model="agendaItem_.title"/>
      </div>

      <div class="form-group">
        <label class="form-label">Докладчик</label>
        <input class="form-control" v-model="agendaItem_.speaker"/>
      </div>

      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="agendaItem_.description"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Язык</label>
        <!--      @change="$emit('update:agendaItem' не обязательно, можно использовать  v-model-->
        <select class="form-control" v-model="agendaItem_.language">
          <option
            v-for="lang in agendaTalkLanguages"
            :value="lang.value"
            :key="lang.id">
            {{ lang.text }}
          </option>
        </select>
      </div>
    </template>

    <template v-else-if="agendaItem_.type === 'other'">
      <div class="form-group">
        <label class="form-label">Заголовок</label>
        <input class="form-control" v-model="agendaItem_.title"/>
      </div>

      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="agendaItem_.description"></textarea>
      </div>
    </template>

    <template v-else>
      <div class="form-group">
        <label class="form-label">Нестандартный текст (необязательно)</label>
        <input class="form-control" v-model="agendaItem_.title"/>
      </div>
    </template>
  </div>
</template>

<script>

import { getAgendaItemTypes, getTalkLanguages } from '@/utils/data'

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      agendaItem_: {
        ...this.agendaItem
      },
      agendaItemTypes: getAgendaItemTypes(),
      agendaTalkLanguages: getTalkLanguages()
    }
  },

  watch: {
    agendaItem: {
      deep: true,
      handler (newValue) {
        this.agendaItem_ = newValue
      }
    },

    agendaItem_: {
      deep: true,
      handler (newValue) {
        this.$emit('update:agendaItem', newValue)
      }
    },

    startsAt: {
      handler (newValue, oldValue) {
        const newStartsAtMinutes = this.makeMinutesFromData(newValue)
        const oldStartAtMinutes = this.makeMinutesFromData(oldValue)
        const differenceStartAtMinutes = newStartsAtMinutes - oldStartAtMinutes

        const oldEndsAtMinutes = this.makeMinutesFromData(this.agendaItem_.endsAt)
        const newEndsAtMinutes = (oldEndsAtMinutes + differenceStartAtMinutes + 24 * 60) % (24 * 60)
        const newMinutes = newEndsAtMinutes % 60

        let newEndsAtHour = (newEndsAtMinutes / 60).toFixed(0)

        if (newEndsAtHour < 10) {
          newEndsAtHour = `0${newEndsAtHour}`
        }

        this.agendaItem_.endsAt = `${newEndsAtHour}:${newMinutes}`
      }
    }
  },

  computed: {
    startsAt () {
      return this.agendaItem_.startsAt
    }
  },

  methods: {
    remove ($event) {
      this.$emit('remove', $event.target.value)
    },

    // parse the agendaItem_ Date format and make a minutes from it
    makeMinutesFromData (strData) {
      const timeMinAndSec = strData.split(':')
      const splitData = timeMinAndSec.map((x) => {
        return parseInt(x, 10)
      })
      const hours = splitData[0]
      const minutes = splitData[1]

      return hours * 60 + minutes
    }
  }

}
</script>

<style></style>
