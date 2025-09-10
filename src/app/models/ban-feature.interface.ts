export default interface BanFeature {
    geometry: { coordinates: [number, number] }; // [lon, lat]
    properties: {
        name?: string;  // n° + voie
        label?: string; // adresse complète n° + voie + code postal + ville
        city?: string;
        postcode?: string;
        citycode?: string;
        street?: string;
        id?: string;
    };
}