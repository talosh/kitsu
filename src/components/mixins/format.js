/*
 * Set of functions to make data more readable.
 */
import { mapGetters } from 'vuex'

import {
  formatDate,
  formatFullDate,
  formatSimpleDate,
  minutesToDays,
  minutesToHours
} from '@/lib/time'

export const formatListMixin = {
  created() {},

  mounted() {},

  beforeDestroy() {},

  computed: {
    ...mapGetters(['organisation'])
  },

  methods: {
    formatBoolean(booleanValue) {
      return booleanValue ? this.$t('main.yes') : this.$t('main.no')
    },

    formatDate,
    formatFullDate,
    formatSimpleDate,

    formatDuration(minutes, toLocale = true) {
      if (!minutes) {
        return 0
      }
      const days = minutesToDays(this.organisation, minutes)
      if (toLocale) {
        return days.toLocaleString('fullwide', {
          maximumFractionDigits: 2
        })
      }
      return days
    },

    formatDurationHours(minutes, toLocale = true) {
      if (!minutes) {
        return 0
      }
      const hours = minutesToHours(this.organisation, minutes)
      if (toLocale) {
        return hours.toLocaleString('fullwide', {
          maximumFractionDigits: 2
        })
      }
      return hours
    },

    formatPriority(priority) {
      let label = priority + ''
      if (priority === 0) {
        label = 'normal'
      } else if (priority === 1) {
        label = this.$t('tasks.priority.high')
      } else if (priority === 2) {
        label = this.$t('tasks.priority.very_high')
      } else if (priority === 3) {
        label = this.$t('tasks.priority.emergency')
      }
      return label
    },

    formatPrioritySymbol(priority) {
      priority = Math.max(0, Math.min(priority, 3))
      return '!'.repeat(priority)
    },

    sanitizeInteger(value) {
      let val = 0
      if (typeof value === 'string') {
        value = value.replace(/\D/g, '')
        if (value && value.length > 0) val = parseInt(value) || 0
      }
      return val
    },

    sanitizeIntegerLight(value) {
      let val = null
      if (typeof value === 'string') {
        value = value.replace(/\D/g, '')
        if (value && value.length > 0) val = parseInt(value) || null
      }
      return val
    }
  }
}
