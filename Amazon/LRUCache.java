/**
 * Design and implement a data structure for Least Recently Used (LRU) cache. It
 * should support the following operations: get and put.
 *
 * get(key) - Get the value (will always be positive) of the key if the key
 * exists in the cache, otherwise, return -1.
 *
 * put(key, value) - Set or insert the value if the key is not already present.
 * When the cache reached its capacity, it should invalidate the least recently
 * used item before inserting a new item.
 *
 * The cache is initialized with a positive capacity.
 *
 * Extra: try doing both operations in O(1) time.
 */

/**
  This problem was solved using Java, because the LinkedHashMap already has all
  the properties needed for this problem, without the need of creating the data
  structure from scratch in another language like JavaScript.

  The LinkedHashMap is perfect for this problem, since it has two key
  properties. First, it gives us the O(1) lookup of values in the HashMap and
  at the same time it provides the order of a linked list. This means that the
  order of the most recently used item is maintained. Best of all, the order
  is updated automatically just by setting the access order to true when the
  LinkedHashMap is declared.
 */
class LRUCache extends LinkedHashMap<Integer, Integer>{
  private int capacity;

  public LRUCache(int capacity) {
    /**
      public LinkedHashMap(int initialCapacity,
                    float loadFactor,
                    boolean accessOrder)
      Initial capacity determines the size of the LinkedHashMap.
      The loading factor is left as default.
      The access order == true merely querying the map with get, causes the 
      LinkedHashMap to change structuraly, moving to the front of the queue the
      last used item.
     */
    super(capacity, 0.75F, true);
    this.capacity = capacity;
  }
  
  public int get(int key) {
    /**
      This is a simple get with the added bonus of setting a default value when
      the key is not found, in this case -1.
     */
    return super.getOrDefault(key, -1);
  }
  
  public void put(int key, int value) {
    super.put(key, value);
  }

  /**
    This function returns true if the map should remove its eldest entry. This
    is perfect since we want to delete the least used item once we reach the 
    maximum capacity of the LinkedHashMap
   */
  @Override
  protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
    return size() > capacity;
  }
}