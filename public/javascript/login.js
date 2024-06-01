const app = new Vue({
    el: '.role_selector',
    data: {
        role: 'admin'
    },
    methods: {
        changeRole: function (newRole) {
            this.role = newRole
        }
    }
})