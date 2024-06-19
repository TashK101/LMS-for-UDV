﻿namespace external_training.Tests.UI.SeleniumCore.Page;

public interface IPage
{
    string Url { get; }
    string BaseUrl { get; }
    void WaitLoaded();
    void Refresh();
}