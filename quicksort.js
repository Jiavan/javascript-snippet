function quickSort(arr) {
    function partition(arr, left, right) {
        var storeIndex = left,
            pivot = arr[right];

        for (var i = left; i < right; i++) {
            if (arr[i] < pivot) {
                swap(arr, i, storeIndex);
                storeIndex++;
            }
        }

        swap(arr, right, storeIndex);

        return storeIndex;
    }

    function swap(arr, x, y) {
        var tmp = arr[x];
        arr[x] = arr[y];
        arr[y] = tmp;
    }

    function sort(arr, left, right) {
        if (left > right) {
            return;
        }
        p = partition(arr, left, right);
        sort(arr, left, p - 1);
        sort(arr, p + 1, right);
    }

    sort(arr, 0, arr.length - 1);
    return arr;
}

var arr = [2, 1, 3, 4, 5, 6, 9, 7, 0];
console.log(quickSort(arr));