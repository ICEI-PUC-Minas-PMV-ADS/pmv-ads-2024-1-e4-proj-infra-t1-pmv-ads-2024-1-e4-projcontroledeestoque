﻿namespace BookStoreApi.Models;

public class StockFlowStoreDatabaseSettings
{
public string ConnectionString { get; set; } = null!;

public string DatabaseName { get; set; } = null!;

public string BooksCollectionName { get; set; } = null!;
}

