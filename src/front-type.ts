export interface RawData {
    discordApplicationId: string;
    presenceState?: string | undefined;
    presenceDetails?: string | undefined;
    presenceStartTime?: string | undefined;
    presenceEndTime?: string | undefined;
    presenceLargeImageKey?: string | undefined;
    presenceLargeImageText?: string | undefined;
    presenceSmallImageKey?: string | undefined;
    presenceSmallImageText?: string | undefined;
    presenceButtons?: Array<{ label: string, url: string }>
}