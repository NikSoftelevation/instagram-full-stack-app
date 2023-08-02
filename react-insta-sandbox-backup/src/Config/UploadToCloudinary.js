
export const uploadToCloudinary = async (image) => {

    if (image) {
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "dcpesbd8q")

        const res = await fetch("https://api.cloudinary.com/v1_1/dcpesbd8q/image/upload", {

            method: "post",
            body: data,
        })

        const fileData = await res.json();

        console.log("File Data", fileData);

        return fileData.url.toString()
    }
}