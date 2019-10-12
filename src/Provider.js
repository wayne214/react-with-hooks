import React from 'react'
import Context from './Context'
import {attachSlots, split} from './utils'
import Slot from './Slot'

const initialState = {
    slotifiedContent: [],
    drafting: true,
    modalOpened: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'set-slotified-content':
            return {...state, slotifiedContent: action.content}
        case 'set-drafting':
            return {...state, drafting: action.drafting}
        case 'open-modal':
            return {...state, modalOpened: true}
        case 'close-modal':
            return {...state, modalOpened: false}
        default:
            return state
    }
}

function useSlotify() {
    const [state, dispatch] = React.useReducer(reducer,initialState)
    const textareaRef = React.useRef()
    const textareaUtils = React.useRef()
    const modalRef = React.useRef()


    function onCopyFinalContent() {
        const html = modalRef.current.innerHTML
        const inputEl = document.createElement('textarea')
        document.body.appendChild(inputEl)
        inputEl.value = html
        inputEl.select()
        document.execCommand('copy')
        document.body.removeChild(inputEl)

    }

    function slotify() {
        let slotifiedContent, content
        if (textareaRef && textareaRef.current) {
            textareaUtils.current.copy()
            content = textareaUtils.current.getText()
        }

        const slot = <Slot/>
        if (content && typeof content === 'string') {
            slotifiedContent = attachSlots(split(content), slot)
        }

        if (!state.drafting) {
            setDrafting(true)
        }

        dispatch({
            type: 'set-slotified-content',
            content: slotifiedContent
        })
    }

    function setDrafting(drafting) {
        if (drafting === undefined) return
        dispatch({type: 'set-drafting', drafting})
    }

    function onSave() {
        if (state.drafting) {
            setDrafting(false)
        }
    }

    function openModal() {
        dispatch({type: 'open-modal'})
    }

    function closeModal() {
        dispatch({type: 'close-modal'})
    }

    return {
        ...state,
        slotify,
        textareaRef,
        setDrafting,
        onSave,
        openModal,
        closeModal,
        textareaUtils,
        onCopyFinalContent,
        modalRef
    }
}


function Provider({children}) {
    return <Context.Provider value={useSlotify()}>
        {children}
    </Context.Provider>
}

export default Provider