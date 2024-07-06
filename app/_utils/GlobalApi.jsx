const { default: axios } = require("axios")


const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY_PRODUCTION

const axiosClient = axios.create({
    baseURL: 'https://eyelash-appointment-booking-admin.onrender.com/api',
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'  // 確保 Content-Type 正確
    }
})

const getCategory = () => axiosClient.get('categories?populate=*')

const getEyelash = () => axiosClient.get('eyelash-technicians?populate=*')

const getAllBookings = () => axiosClient.get("/appointments?populate=*");

const getLasherByCategory = (category) => {
    const url = `/eyelash-technicians?filters[categories][Name][$in]=${category}&populate=*`;
    return axiosClient.get(url);
};

const getEyelashById = (id) => axiosClient.get(`/eyelash-technicians/${id}?populate=*`);


const bookAppointment = (data) => axiosClient.post('/appointments', data);

const sendEmail = (data) => axios.post('/api/sendEmail', data);

const getUserBookingList = (userEmail) => axiosClient.get("/appointments?[filters][Email][$eq]=" + userEmail + "&populate[eyelash_technician][populate][Image][populate][0]=url&populate=*")

const deleteBooking = (id) => axiosClient.delete('/appointments/' + id);

export default {
    getCategory,
    getEyelash,
    getLasherByCategory,
    getEyelashById,
    bookAppointment,
    sendEmail,
    getUserBookingList,
    deleteBooking,
    getAllBookings
}