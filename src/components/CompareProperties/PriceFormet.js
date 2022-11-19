export const PriceFormet = (price) => {
    var indianPriceFormet = price;
    indianPriceFormet = indianPriceFormet.toString();
    var lastThree = indianPriceFormet.substring(indianPriceFormet.length - 3);
    var otherNumbers = indianPriceFormet.substring(0, indianPriceFormet.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var finalPriceFormet = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return finalPriceFormet;
}