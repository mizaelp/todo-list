import renderTodo from './render_list/index.js'

const initialState = () => {
    initialStatePresenter()
}

const initialStateModel = () => {
    return {}
}

const initialStateView = () => {
    // CREATE THE ELEMENTS
    const h1 = document.createElement("h1")
    const div = document.createElement("div")
    const form = document.createElement("form")
    const input = document.createElement("input")
    const button = document.createElement("button")

    // CREATE THE TEXT-NODE OF THE ELEMENTS
    const h1Text = document.createTextNode("To Do List")
    const buttonText = document.createTextNode("Submit")

    // APPENDING THE TEXT-NODE THE ELEMENTS
    h1.appendChild(h1Text)
    button.appendChild(buttonText)

    // SETTING THE ATTRIBUTES INTO THE ELEMENTS
    div.setAttribute("id", "entry-point")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Add ToDo")
    input.setAttribute("name", "todo")
    input.setAttribute("id", "input-add-todo")
    button.setAttribute("id", "btn-add-todo")

    // APPENDING THE CHILDREN ELEMENTS INTO THE PARENT ELEMENTS
    form.appendChild(input)
    form.appendChild(button)

    const arrayElements = [h1, form, div]

    return arrayElements
}

const initialStatePresenter = () => {
    const model = initialStateModel()
    const view = initialStateView(model)

    view.forEach(element => {
        document.querySelector("div#root").appendChild(element)
    })

    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault()

        const inputValue = document.querySelector("input#input-add-todo").value

        if(!inputValue.length) {
            //! TODO: criar snackbar
            alert("Please, digit some To Do")
        } else {
            const answers = {
                "description": inputValue,
                "status": false
            }
            //! CHAMAR FUNÇÃO QUE FAZ POST DOS TODOS LIST
        }
    })

    renderTodo()
}


// INITIALIZE THE PROGRAM
initialState()