import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Modal} from 'semantic-ui-react'
import Context from './Context'
import Provider from './Provider'
import PasteBin from './PasteBin'
import Button from './Button'
import styles from './styles.module.css'

const callFns = (...fns) => () => fns.forEach((fn) => fn && fn())
const ModalContent = ({ innerRef, ...props }) => (
    <div ref={innerRef} {...props} />
)

const App = () => {
    const {
        modalOpened,
        slotifiedContent = [],
        slotify,
        onSave,
        openModal,
        closeModal,
        modalRef,
        onCopyFinalContent
    } = React.useContext(Context)

    return (
        <div
            style={{
                padding: 12,
                boxSizing: 'border-box'
            }}
        >
            <Modal
                open={modalOpened}
                trigger={
                    <Button type="button" onClick={callFns(slotify, openModal)}>
                        Start Quotifying
                    </Button>
                }
            >
                <Modal.Content
                    style={{
                        background: '#fff',
                        padding: 12,
                        color: '#333',
                        width: '100%'
                    }}
                >
                    <div>
                        <Modal.Description as={ModalContent} innerRef={modalRef}>
                            {
                                slotifiedContent.map(content =>(
                                    <div style={{ whiteSpace: 'pre-line'}}>{content}</div>
                                ))
                            }
                        </Modal.Description>
                    </div>
                    <Modal.Actions>
                        <Button type='button' onClick={onSave}>
                            Save
                        </Button>
                        <Button type='button' onClick={closeModal}>
                            Close
                        </Button>
                        <Button type='button' onClick={onCopyFinalContent}>
                            Copy
                        </Button>
                    </Modal.Actions>
                </Modal.Content>
            </Modal>

            <PasteBin onSubmit={slotify}/>
        </div>
    );
}

export default () => (
    <Provider>
        <App />
    </Provider>
)
