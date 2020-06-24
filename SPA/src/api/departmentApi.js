const departmentApi = instance => ({
    get() {
        return instance.get('department')
            .then(response => {
                return response.data;
            });
    },
});

export default departmentApi;