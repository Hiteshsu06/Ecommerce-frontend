export const refactorPrefilledDate=(date)=>{
    const originalDate = new Date(date);
    return originalDate.toISOString().split('T')[0];
}