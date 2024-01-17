import React, { createContext, useState } from 'react'
import { CloseModalIcon } from './Icons'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <div className="fixed bg-black/20 top-0 right-0 left-0 bottom-0 z-[29]" />
      <div
        className="w-[760px] p-5 rounded bg-white top-10 left-1/2 -translate-x-1/2 absolute z-[30]"
      >
        <div className={"float-right"} onClick={onClose}>
          <CloseModalIcon />
        </div>
        {children}
      </div>
    </>
  )
}

interface IModalContext {
  modal: boolean
  open: () => void
  close: () => void
}

export const ModalContext = createContext<IModalContext>({
  modal: false,
  open: () => { },
  close: () => { }
})

export const ModalState = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false)

  const open = () => setModal(true)

  const close = () => setModal(false)

  return (
    <ModalContext.Provider value={{ modal, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}
