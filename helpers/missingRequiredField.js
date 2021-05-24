module.exports = {
    handleMissingRequiredField: (arr) => {
        for(let i=0; i<arr.length; i++) {
            if(!arr[i]) {
                return('Please complete all required fields.')
            }
        }
    }
}