const app = new Vue({
    el: '.login_form',
    data: {
        role: 'admin'
    },
    methods: {
        changeRole: function (newRole) {
            this.role = newRole
        }
    }
})