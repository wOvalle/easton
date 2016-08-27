$(() => {
        router.changeRoute()

        $(document).on('click', 'a.click-async', (event) => {
            event.preventDefault()
            event.stopPropagation()

            const url = $(event.target).prop('href')
            const lastPortionStartsAt = url.lastIndexOf('/')

            const route = url.substring(lastPortionStartsAt + 1, url.length)

            router.changeRoute(route)
        })
})