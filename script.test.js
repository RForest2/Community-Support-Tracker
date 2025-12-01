const setCookie = require('./script')

test('Temp data object updates when form is submitted', () => {
    expect(setCookie('name', 'date', 'value')).ToBe('name', 'date', 'value')
})

const form = require('./script')

test('Submitting the form with improper data to check for error messages'), () => {
    expect(form(addEventListener("submit")))
}

