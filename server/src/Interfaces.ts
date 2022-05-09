export interface Settings {
    httpPort: number;
    mongoDbName: string;
    mongoDbUsername: string;
    mongoDbPassword: string;
    mongoDbKeepAlive: number;
    mongoDbReconnectIntervalMillis: number;
    mongoDbReconnectTries: number;
    getEndGamePlayerStatsRetryTimeout: number;
    xpForWin: number;
    xpForLoss: number;
    xpForNextLevelByLevel: { [key: string]: number };
    levelCap: number;
    averageRandomDelayForProcessEndGameStatsMs: number;
    diameterForRandomDelayForProcessEndGameStatsMs: number;
    mongoDbReplicaSet: string;
    mongoDbUris: Array<string>;
    logMorgan: boolean;
}