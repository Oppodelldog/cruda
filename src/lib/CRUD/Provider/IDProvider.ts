/**
 * This Provider helps to get the id from form data to properly call the Adapter methods create/update.
 */
export interface IDProvider {
    /**
     * getId extracts the id field from the given data.
     * @param o
     */
    getId(o: object): string
}

/**
 * This provider extracts the ID from a field called "id".
 */
export class IDProviderDefault implements IDProvider {
    getId(o: any): string {
        return o.id as string;
    }
}