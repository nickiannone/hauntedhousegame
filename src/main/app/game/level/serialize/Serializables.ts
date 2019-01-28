
export abstract class Serializer<SERIALIZABLE extends Serializable<any>> {
    public abstract linkChildren(serializable: SERIALIZABLE): void;
}

export interface Serializable<P> {
    parent?: P;
}
