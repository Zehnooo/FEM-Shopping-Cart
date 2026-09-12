export const client = {
    device: {
        type: null,
        getDevice(){
            return this.type;
        },
        setDevice(){
            const width = window.innerWidth;
            if (width < 768) {
                this.type  = 'mobile';
            } else if (width >= 768 && width < 1024) {
                this.type = 'tablet';
            } else {
                this.type = 'desktop';
            }
        }
    }
}