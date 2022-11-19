import { ApiGet } from '../Api/ApiData';

export const handleGetPropertyHistoryCommonAPI = (propertyData) => {
    return new Promise((resolve, reject) => {
        ApiGet(`history/getAllHistory?pid=${propertyData?._id}&statusName=${propertyData?.statusOfProperty}`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload?.history);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
};

export const handleGetPropertyHistoryByUidAndPid = (propertyData, uid) => {
    return new Promise((resolve, reject) => {
        ApiGet(`history/getAllHistory?statusName=${propertyData?.statusOfProperty}&uid=${uid}&pid=${propertyData?._id}`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
};

export const handleGetBookingByPropertyId = (propertyData) => {
    return new Promise((resolve, reject) => {
        ApiGet(`book/getAllBook?pid=${propertyData._id}`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
};

export const handleGetPropertyStatus = () => {
    return new Promise((resolve, reject) => {
        ApiGet(`status/getAllstatus`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload?.status);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
};

export const handleGetPropertyHistoryByPropertyIdUserId = (propertyId, userDetails) => {
    return new Promise((resolve, reject) => {
        ApiGet(`history/getAllHistory?pid=${propertyId}&uid=${userDetails.id}`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
};

export const handleGetMyProperty = (userDetails) => {
    return new Promise((resolve, reject) => {
        ApiGet(`property/getPropertyByUid?uid=${userDetails.id}`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
}

export const handleGetTokenPrice = () => {
    return new Promise((resolve, reject) => {
        ApiGet(`token/getAlltoken`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
}

export const handleGetFaqCategory = () => {
    return new Promise((resolve, reject) => {
        ApiGet(`faqCategory/getAllFAQCategory`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
}

export const handleGetFaqByCategoryId = (categoryId) => {
    return new Promise((resolve, reject) => {
        ApiGet(`faq/getAllFAQ?facCategoryId=${categoryId}`)
            .then((res) => {
                if (res.data.result === 0) {
                    resolve(res.data.payload);
                }
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    })
}