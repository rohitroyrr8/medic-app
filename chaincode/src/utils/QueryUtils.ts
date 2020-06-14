export class QueryUtils {
    public static async getResultForQueryString(stub, queryString) {
        const resultIterator: any = await stub.getQueryResult(queryString);
        const results = await this.getAllResults(resultIterator, false);
        return Buffer.from(JSON.stringify(results));
    }

    private static async getAllResults(iterator, isHistory) {
        const results: any = [];
        while(true) {
            const res: any = await iterator.next();
            if(res.value && res.value.value.toString()) {
                const jsonRes: any = {};

                if(isHistory && isHistory === true) {
                    jsonRes.txId = res.value.tx_id;
                    jsonRes.timestamp = res.value.timestamp;
                    jsonRes.isDeleted = res.value.is_delete.toString();
                    try {
                        jsonRes.value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (error) {
                        console.log(error);
                        jsonRes.value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.key = res.value.key;
                    try {
                        jsonRes.record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (error) {
                        console.log(error);
                        jsonRes.record = res.value.value.toString('utf8');
                    }
                }
                results.push(jsonRes);
            }
            if(res.done) {
                await iterator.close();
                return results;
            }
        }
    }
}
