const client = {
    device: {
        type: null,
        getDevice(){
            const width = window.innerWidth;
            if (width < 768) {
                return 'mobile';
            } else if (width >= 768 && width < 1024) {
                return 'tablet';
            } else {
                return 'desktop';
            }
        },
        setDevice(){
            client.device.type = this.getDevice();
        }
    }
}