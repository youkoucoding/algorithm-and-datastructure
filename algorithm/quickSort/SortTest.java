public class SortTest {
	public static void main(String[] args) {
			testQuickSort();
	}

	/**
	 * 快速排序
	 */
	private static void testQuickSort() {
			int[] array = {5, 9, 1, 2, 8, 9, 5, 3, 7, 6, 1};
			QuickSort quickSort = new QuickSort(array);
			quickSort.sort();
			quickSort.print();
	}
}
