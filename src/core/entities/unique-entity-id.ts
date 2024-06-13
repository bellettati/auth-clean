import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
    private value: string

    constructor(value?: string) {
        this.value = value ?? randomUUID()
    }

    public toString(): string {
        return this.value
    }

    public toValue(): string {
        return this.value
    }

    public isEqual(id: UniqueEntityId): boolean {
        return id.toValue() === this.value
    }
}
