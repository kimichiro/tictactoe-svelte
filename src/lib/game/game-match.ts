/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Room } from 'colyseus.js'
import { EventEmitter } from 'eventemitter3'

// #region Client messages

export const SeatRequestMessageType = 'seat-request'
export interface SeatRequestPayload {}

export const GameMoveMessageType = 'game-move'
export interface GameMovePayload<Action = unknown> {
    action: Action
}

// #endregion

// #region Server messages

export const GameStartedMessageType = 'game-started'
export interface GameStartedPayload {}

export const GameEndedMessageType = 'game-ended'
export interface GameEndedPayload {}

// #endregion

export class GameMatch<State> {
    #room: Room<State>
    #events: EventEmitter

    constructor(room: Room<State>) {
        this.#room = room
        this.#events = new EventEmitter()

        this.#room.onMessage('game-started', this.emit.bind(this, 'game-started'))
        this.#room.onMessage('game-ended', this.emit.bind(this, 'game-ended'))
        this.#room.onStateChange(this.emit.bind(this, 'state-changed'))

        this.#room.onError(this.emit.bind(this, 'error'))
        this.#room.onLeave(this.emit.bind(this, 'leave'))

        this.on('leave', this.onLeave.bind(this))
    }

    get roomId(): string {
        return this.#room.roomId
    }

    get roomName(): string {
        return this.#room.name
    }

    get sessionId(): string {
        return this.#room.sessionId
    }

    get state(): State {
        return this.#room.state
    }

    sendMessage(type: 'match-seat-request', payload: SeatRequestPayload): void
    sendMessage(type: 'game-move', payload: GameMovePayload): void
    sendMessage<T>(type: string, message?: T): void {
        this.#room.send(type, message)
    }

    async leave(consented?: boolean): Promise<number> {
        return await this.#room.leave(consented)
    }

    on(type: 'game-started', callback: () => void): void
    on(type: 'game-ended', callback: () => void): void
    on(type: 'state-changed', callback: (state: State) => void): void
    on(type: 'error', callback: (code: number, message?: string) => void): void
    on(type: 'leave', callback: (code: number) => void): void
    on(type: string, callback: (...args: any[]) => void): void
    on(type: string, callback: (...args: any[]) => void): void {
        this.#events.on(type, callback)
    }

    off(type: 'game-started', callback: () => void): void
    off(type: 'game-ended', callback: () => void): void
    off(type: 'state-changed', callback: (state: State) => void): void
    off(type: 'error', callback: (code: number, message?: string) => void): void
    off(type: 'leave', callback: (code: number) => void): void
    off(type: string, callback: (...args: any[]) => void): void
    off(type: string, callback: (...args: any[]) => void): void {
        this.#events.off(type, callback)
    }

    private emit(type: string, ...args: any[]): void {
        this.#events.emit(type, ...args)
    }

    private onLeave(): void {
        this.#room.removeAllListeners()
    }
}
