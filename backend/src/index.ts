import configureApp from "./app"


const PORT = 3001

const app = configureApp()

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

