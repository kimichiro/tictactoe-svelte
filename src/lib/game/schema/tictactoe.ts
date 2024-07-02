export enum Role {
    Oh = 'O',
    Ex = 'X'
}

export enum Position {
    A1 = 'a1',
    A2 = 'a2',
    A3 = 'a3',
    B1 = 'b1',
    B2 = 'b2',
    B3 = 'b3',
    C1 = 'c1',
    C2 = 'c2',
    C3 = 'c3'
}

export interface GameAction {
    readonly role: Role
    readonly position: Position
}

export interface GameArea<Action extends GameAction = GameAction> {
    readonly table: Record<string, Role>

    readonly actions: Action[]
}

export type ConnectionStatus = 'unknown' | 'online'
export interface Connection {
    readonly status: ConnectionStatus
}

export interface GamePlayer {
    readonly id: string
    readonly name: string
    readonly connection: Connection

    readonly role: Role
}

export interface GameMove {
    readonly notation: string
    readonly player: GamePlayer
}

export interface GameResult {
    readonly draw: boolean
    readonly winner: GamePlayer | null
}

export interface GameState<
    Area extends GameArea = GameArea,
    Player extends GamePlayer = GamePlayer,
    Move extends GameMove = GameMove,
    Result extends GameResult = GameResult
> {
    readonly minPlayers: number
    readonly maxPlayers: number
    readonly players: Player[]

    readonly area: Area
    readonly currentTurn: Player | null
    readonly moves: Move[]

    readonly started: boolean
    readonly result: Result | null
}
