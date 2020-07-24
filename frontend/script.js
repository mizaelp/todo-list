import renderTodo from './render_list/index.js'

const initialState = () => {
    initialStatePresenter()
}

const initialStateModel = () => {
    return {}
}

const initialStateView = () => {
    const elements = ["h1", "div", "form", "input", "button"]
    
    // CREATE THE ELEMENTS
    const html = arr => arr.map(element => document.createElement(element)) 

    // SETTING THE ATTRIBUTES INTO THE ELEMENTS
    const att = (element, name, value) => element.setAttribute(name, value)

    const [h1, div, form, input, button] = html(elements)

    // CREATE THE TEXT-NODE OF THE ELEMENTS
    const h1Text = document.createTextNode("To Do List")
    const buttonText = document.createTextNode("Submit")

    // APPENDING THE TEXT-NODE THE ELEMENTS
    h1.appendChild(h1Text)
    button.appendChild(buttonText)

    att(div, "id", "entry-point")
    att(input, "type", "text")
    att(input, "placeholder", "Add ToDo")
    att(input, "name", "todo")
    att(input, "id", "input-add-todo")
    att(button, "id", "btn-add-todo")

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