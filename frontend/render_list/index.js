const renderTodo = () => {
    renderTodoPresenter()
}

const renderTodoView = (obj) => {
    console.log(obj)
    const ul = document.createElement("ul")
    const p = document.createElement("p")
    const paragraphText = document.createTextNode("Nothing to do! Add a task?")
    p.appendChild(paragraphText)

    obj.forEach(list => {
        const li = document.createElement("li")
        const input = document.createElement("input")
        const span = document.createElement("span")
        const button = document.createElement("button")

        const spanText = document.createTextNode(list.description)
        const buttonText = document.createTextNode("Delete")

        input.setAttribute("type", "checkbox")
        span.setAttribute("class", "editable")
        button.setAttribute("class", "delete")

        button.appendChild(buttonText)
        span.appendChild(spanText)
        li.appendChild(input)
        li.appendChild(span)
        li.appendChild(button)
        ul.appendChild(li)

        if (list.status === 1) {
            input.setAttribute("checked", true)
            input.nextElementSibling.classList.add("sublinado")
        }
    })


    const element = obj.length === 0 ? p : ul

    return [element]
}

const renderTodoModel = () => {
    return fetch("/todos")
        .then(response => response.json())
}

const renderTodoPresenter = async () => {
    const model = await renderTodoModel()
    const view = renderTodoView(model)

    //! VERIFICAR UMA MELHOR SOLUÇÃO
    document.querySelector("div#entry-point").innerHTML = ""

    view.forEach(element => {
        document.querySelector("div#entry-point").appendChild(element)
    })

    const finObj = text => model.find(element => element.description === text)
    const findObjByid = id => model.find(element => element.id === id)

    const input = document.querySelectorAll("input[type=checkbox")
    input.forEach(element => {
        element.addEventListener("change", () => {
            element.nextElementSibling.classList.toggle("sublinado")
            const answers = finObj(element.nextElementSibling.textContent)

            // if (element.checked) {
            //     answers.status = true
            // } else {
            //     answers.status = false
            // }
            //! CHAMAR FUNÇÃO QUE ATUALIZA O TODO
        })
    })
}

export default renderTodo