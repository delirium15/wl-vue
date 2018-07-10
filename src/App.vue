<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>HTTP</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input class="form-control" type="text" v-model="user.username">
                </div>
                <div class="form-group">
                    <label>Mail</label>
                    <input class="form-control" type="text" v-model="user.email">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <button class="btn btn-primary" @click="getdata">Get data</button>
                <hr>
                <ul class="list-group">
                    <li class="list-group-item" v-for="u in users">{{ u.username }} | {{ u.email }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: ''
                },
                users: [],
                resource: {}
            }
        },
        methods: {
            submit() {
                //this.resource.save()

                this.$http.post('data.json', this.user) // вместо '' можно поставить путь (Vue.http.options.root)
                    .then(response => {
                        console.log(response);
                    }, error => {
                        console.log(error);
                    });
            },
            getdata() {
                this.$http.get('data.json')
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        for(let key in data) {
                            this.users.push(data[key]);
                        }
                    });
            },


        },
        created() {
            this.resource = this.$resource('data.json');
        }
    }
</script>

<style>
</style>
