const userApi = instance => ({
    get() {
      return instance.get('user')
          .then(response => {
             return response.data;
          });
    },
    post(data) {
        return instance.post('user', data)
            .then(response => {
                return response.data;
            });
    },
    put(data) {
        return instance.put('user', data)
            .then(response => {
                return response.data;
            });
    },
    delete(id) {
        return instance.delete(`user/${id}`)
            .then(response => {
                return response.data;
            });
    },
});

export default userApi;